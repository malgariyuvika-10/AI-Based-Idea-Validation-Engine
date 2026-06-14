from sqlalchemy import inspect, text


IDEA_COLUMNS = {
    "market_score": "INTEGER DEFAULT 0",
    "market_summary": "TEXT",
    "feasibility_score": "INTEGER DEFAULT 0",
    "feasibility_summary": "TEXT",
    "risk_score": "INTEGER DEFAULT 0",
    "risk_summary": "TEXT",
    "overall_score": "FLOAT DEFAULT 0.0",
    "provider": "VARCHAR DEFAULT 'local'",
    "recommendation": "VARCHAR",
    "strengths": "TEXT",
    "weaknesses": "TEXT",
    "analysis_summary": "TEXT",
}


def migrate_sqlite_schema(engine) -> None:
    if engine.dialect.name != "sqlite":
        return

    inspector = inspect(engine)
    if "ideas" not in inspector.get_table_names():
        return

    existing_columns = {
        column["name"]
        for column in inspector.get_columns("ideas")
    }

    with engine.begin() as connection:
        for column_name, column_type in IDEA_COLUMNS.items():
            if column_name not in existing_columns:
                connection.execute(
                    text(f"ALTER TABLE ideas ADD COLUMN {column_name} {column_type}")
                )
