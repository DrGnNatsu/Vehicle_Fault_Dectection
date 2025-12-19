from setuptools import setup, find_packages

setup(
    name="be-fastapi",
    version="0.1.0",
    packages=find_packages(include=["app*", "script*", "alembic*"]),
    install_requires=[

    ],
)
