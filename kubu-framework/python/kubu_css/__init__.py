"""KUBU CSS as static files for Django and Flask.

There is no Python API. The package only carries the stylesheet:

    kubu_css/static/kubu/kubu.min.css   the whole framework, one file
    kubu_css/static/kubu/kubu.css       the same, readable
    kubu_css/static/kubu/css/...        every atom, molecule and organism on its own
    kubu_css/static/kubu/img/icons.svg  the icon sprite

Django: add "kubu_css" to INSTALLED_APPS, then {% static 'kubu/kubu.min.css' %}.
Flask: Blueprint("kubu", "kubu_css", static_folder="static", static_url_path="/static/kubu-pkg").
"""
