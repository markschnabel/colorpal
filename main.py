import os
from app import create_app

if __name__ == '__main__':
    app = create_app()

    app.run(port=os.environ.get('COLORPAL_PORT', 80))
