FROM python:3.10
COPY pyproject.toml /
COPY poetry.lock /
ENV PYTHONPATH=${PYTHONPATH}:${PWD}
ENV POETRY_VIRTUALENVS_IN_PROJECT true
RUN pip3 install --no-cache-dir poetry==1.6.1 && poetry config virtualenvs.create false && poetry install --no-interaction
COPY main.py /
COPY app /app
EXPOSE 8000

CMD poetry run uvicorn main:app --host=0.0.0.0 --port=${8000:-8000}
