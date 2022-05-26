from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from starlette.responses import FileResponse

app = FastAPI()
app.mount('/', StaticFiles(directory='static', html=True), name='static')


@app.get("/")
async def root():
    return FileResponse('index.html')
