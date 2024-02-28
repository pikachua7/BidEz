from sqlalchemy.orm import Session

from api.models.user import User
from api.schemas.user import UserCreate, UserDisplay
from api.utils.security import create_access_token, get_password_hash, verify_password


def create_user(db: Session, user: UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = User(**user.model_dump(exclude={"password"}))
    db_user.hashed_password = hashed_password
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def get_users_by_ids(db: Session, user_ids: list[int]):
    return db.query(User).filter(User.id.in_(user_ids)).all()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(User).offset(skip).limit(limit).all()


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def authenticate_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    user_data = UserDisplay.model_validate(user)
    token = create_access_token(user_data.model_dump())
    return token


def authenticate_user_sso(db: Session, email: str, password: str):
    # TODO: update logic to handle SSO login (at least login without password)
    return authenticate_user(db, email, password)
