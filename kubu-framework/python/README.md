# kubu-css for Python

KUBU's stylesheet as static files for Django and Flask. There is no Python API.

```sh
pip install kubu-css
```

## Django

```python
INSTALLED_APPS = [..., "kubu_css"]
```

```html
{% load static %}
<link rel="stylesheet" href="{% static 'kubu/kubu.min.css' %}">
```

## Flask

```python
from flask import Blueprint
kubu = Blueprint("kubu", "kubu_css", static_folder="static", static_url_path="/static/kubu-pkg")
app.register_blueprint(kubu)
```

```html
<link rel="stylesheet" href="{{ url_for('kubu.static', filename='kubu/kubu.min.css') }}">
```

## What is inside

| Path | What it is |
| --- | --- |
| `kubu/kubu.min.css` | The whole framework, one file |
| `kubu/kubu.css` | The same, readable |
| `kubu/css/` | Every atom, molecule and organism on its own |
| `kubu/img/icons.svg` | The icon sprite |

Docs and source: https://github.com/ktsoaela/KUBU
