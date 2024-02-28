import argparse
import json

from sqlalchemy import MetaData, text

from api.database import Base, engine, get_db
from api.models.project import *
from api.models.project_analysis import *
from api.models.user import *
from api.schemas.project import ProjectCreate
from api.schemas.user import UserCreate
from api.services.user_service import get_user
from api.utils.security import get_password_hash


def create_tables():
    Base.metadata.create_all(bind=engine)
    print("Tables created.")


def drop_tables():
    with engine.connect() as connection:
        transaction = connection.begin()
        metadata = MetaData()
        metadata.reflect(bind=engine)
        for table in reversed(metadata.sorted_tables):
            connection.execute(table.delete())
            connection.execute(text(f"DROP TABLE {table.name} CASCADE;"))
        transaction.commit()
        print("Tables dropped.")


def create_initial_users(json_file):
    with open(json_file, "r") as file:
        data = json.load(file)
        db = next(get_db())
        try:
            for user_data in data:
                user = UserCreate(**user_data)
                hashed_password = get_password_hash(user.password)
                db_user = User(**user.model_dump(exclude={"password"}))
                db_user.hashed_password = hashed_password
                db.add(db_user)
            db.commit()
            print("Initial users created.")
        except Exception as e:
            db.rollback()
            print("Error while creating users: ", str(e))
        finally:
            db.close()


def create_initial_projects(json_file):
    with open(json_file, "r") as file:
        projects_data = json.load(file)
        db = next(get_db())
        try:
            for project_data in projects_data:
                project = ProjectCreate(**project_data)
                bid_owner = get_user(db, project.bid_owner_id)
                if not bid_owner:
                    raise ValueError(
                        f"User with id {project.bid_owner_id} does not exist"
                    )
                db_project = Project(**project.model_dump(exclude={"team_members"}))
                for member in project.team_members:
                    db_team_member = get_user(db, member.user_id)
                    if not db_team_member:
                        raise ValueError(
                            f"User with id {member.user_id} does not exist"
                        )
                    project_team_member = ProjectTeamMember(
                        project=db_project, user=db_team_member, role=member.role
                    )
                    db_project.team_members.append(project_team_member)
                db.add(db_project)
            db.commit()
            print("Initial projects created.")
        except Exception as e:
            db.rollback()
            print("Error while creating projects: ", str(e))
        finally:
            db.close()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Manage the database for the API.")
    parser.add_argument("--create", action="store_true", help="Create database tables.")
    parser.add_argument("--drop", action="store_true", help="Drop database tables.")
    parser.add_argument(
        "--init-users", type=str, help="Create initial users from a JSON file."
    )
    parser.add_argument(
        "--init-projects", type=str, help="Create initial projects from a JSON file."
    )

    args = parser.parse_args()

    if args.create:
        create_tables()
    elif args.drop:
        drop_tables()
    elif args.init_users:
        create_initial_users(args.init_users)
    elif args.init_projects:
        create_initial_projects(args.init_projects)
    else:
        parser.print_help()
