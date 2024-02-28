from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, scoped_session, sessionmaker

from api.settings import settings

# Create an engine instance
engine = create_engine(settings.database_url)


# Create a configured "Session" class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create a scoped session
db_session = scoped_session(SessionLocal)

Base = declarative_base()


# Dependency to get DB session
def get_db():
    try:
        db = db_session()
        yield db
    finally:
        db.close()
