# Forms

Forgiving forms: labels stay visible, errors wait until you leave a field and say how to fix it, and the send button wakes up when the required fields are valid. All of it is CSS.

## A field

```html
<div class="form-group">
  <label class="form-label" for="email">Email <span class="form-label__hint">(required)</span></label>
  <input class="form-input" id="email" name="email" type="email" autocomplete="email" required
         placeholder="e.g. palesa@example.com" aria-describedby="email-error">
  <p class="form-error form-error--live" id="email-error">Enter an email address with an @ and a dot, like palesa@example.com.</p>
</div>
```

- `.form-label__hint` says "(required)" in words, not a red star alone.
- The placeholder is only an example.
- `.form-error` pairs the danger colour with an icon and a sentence. `.form-error--live` stays hidden until the field is `:user-invalid`.

## A guarded form

```html
<form class="form-container form-container--guarded" action="/signup" method="post">
  …fields…
  <button class="form-submit" type="submit">Create account</button>
</form>
```

`.form-container--guarded` dims the submit button while any field is `:invalid`. The browser's own validation stays on as the fallback.

## An error from the server

```html
<input class="form-input" id="username" name="username" value="thabo"
       aria-invalid="true" aria-describedby="username-error">
<p class="form-error" id="username-error">thabo is taken. Try thabo.m or add a number.</p>
```

## Secondary fields

Keep optional fields in a `<details>` until someone needs them:

```html
<details class="collapse-details">
  <summary>Add a company name and VAT number</summary>
  <div class="form-group">…</div>
</details>
```

## Other controls

- Selects and text areas: `.form-select`, `.form-textarea`.
- Dates: `<input type="date">` with `.datepicker__input`.
- Files: `<input class="file-upload__input" type="file">` shows the chosen file name without script.
- Star rating: `fieldset.rating` with radio buttons.

## Staying on the page with htmx

```html
<form action="/newsletter" method="post" hx-post="/newsletter" hx-target="#result" hx-swap="innerHTML">
  …
  <button class="button button--primary" type="submit">Get release notes <span class="spinner spinner--small htmx-indicator" aria-hidden="true"></span></button>
  <div id="result" aria-live="polite"></div>
</form>
```

Without htmx it is a normal form post.

## Microcopy

Buttons say the outcome: "Create account", "Save changes", "Send message". Not "Submit".
