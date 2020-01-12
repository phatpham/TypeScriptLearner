from typescript.api.utils.factory import create_app
from typescript.api.utils.config import DevelopmentConfig, ProductionConfig
import os

app = create_app(ProductionConfig)
if __name__ == '__main__':
    app.run()
    