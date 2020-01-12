from typescript.api.utils.factory import create_app
from typescript.api.utils.config import DevelopmentConfig, ProductionConfig
import os

if __name__ == '__main__':
    app = create_app(DevelopmentConfig)
    app.run()
    