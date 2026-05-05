import os


def load_env_file() -> None:
    """
    Read values from a local .env file if it exists.
    This is a simple beginner-friendly loader.
    """
    env_file_path = ".env"

    if not os.path.exists(env_file_path):
        return

    with open(env_file_path, "r", encoding="utf-8") as env_file:
        for raw_line in env_file:
            line = raw_line.strip()

            if not line or line.startswith("#") or "=" not in line:
                continue

            key, value = line.split("=", 1)
            os.environ.setdefault(key.strip(), value.strip())


load_env_file()


class Settings:
    def __init__(self):
        # These values can come from .env or from terminal environment variables.
        self.DB_HOST = os.getenv("DB_HOST", "localhost")
        self.DB_PORT = int(os.getenv("DB_PORT", "3306"))
        self.DB_USERNAME = os.getenv("DB_USERNAME", "root")
        self.DB_PASSWORD = os.getenv("DB_PASSWORD", "1234")
        self.DB_NAME = os.getenv("DB_NAME", "products")

        # Build the MySQL connection string from the separate credential fields.
        self.DATABASE_URL = os.getenv(
            "DATABASE_URL",
            f"mysql+pymysql://{self.DB_USERNAME}:{self.DB_PASSWORD}"
            f"@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}",
        )


settings = Settings()
