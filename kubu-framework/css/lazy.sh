#!/bin/bash

# Define base directory
BASE_DIR="."

# Define directories
DIRECTORIES=(
  "$BASE_DIR/atoms"
  "$BASE_DIR/molecules"
  "$BASE_DIR/organisms"
  "$BASE_DIR/utilities"
  "$BASE_DIR/snippets"
  "$BASE_DIR/pages"
  "$BASE_DIR/templates"
)

# Define files
FILES=(
  "$BASE_DIR/atoms/Buttons.css"
  "$BASE_DIR/atoms/Close.css"
  "$BASE_DIR/atoms/Badge.css"
  "$BASE_DIR/atoms/Spinners.css"
  "$BASE_DIR/atoms/Colors.css"
  "$BASE_DIR/atoms/Typography.css"
  "$BASE_DIR/molecules/ButtonGroups.css"
  "$BASE_DIR/molecules/FormGroups.css"
  "$BASE_DIR/molecules/ListGroups.css"
  "$BASE_DIR/molecules/Navbar.css"
  "$BASE_DIR/molecules/Navs.css"
  "$BASE_DIR/molecules/Pagination.css"
  "$BASE_DIR/molecules/Dropdowns.css"
  "$BASE_DIR/molecules/Breadcrumb.css"
  "$BASE_DIR/organisms/Accordion.css"
  "$BASE_DIR/organisms/Alerts.css"
  "$BASE_DIR/organisms/Card.css"
  "$BASE_DIR/organisms/Carousel.css"
  "$BASE_DIR/organisms/Collapse.css"
  "$BASE_DIR/organisms/DatePicker.css"
  "$BASE_DIR/organisms/FileUpload.css"
  "$BASE_DIR/organisms/Forms.css"
  "$BASE_DIR/organisms/ListGroups.css"
  "$BASE_DIR/organisms/Modal.css"
  "$BASE_DIR/organisms/Offcanvas.css"
  "$BASE_DIR/organisms/Popovers.css"
  "$BASE_DIR/organisms/Progress.css"
  "$BASE_DIR/organisms/Scrollspy.css"
  "$BASE_DIR/organisms/Stepper.css"
  "$BASE_DIR/organisms/Tables.css"
  "$BASE_DIR/organisms/Tabs.css"
  "$BASE_DIR/organisms/Toasts.css"
  "$BASE_DIR/organisms/Tooltips.css"
  "$BASE_DIR/organisms/Rating.css"
  "$BASE_DIR/utilities/Ajax.css"
  "$BASE_DIR/utilities/Animations.css"
  "$BASE_DIR/utilities/EventDelegation.css"
  "$BASE_DIR/utilities/Helpers.css"
  "$BASE_DIR/utilities/Notifications.css"
  "$BASE_DIR/snippets/Forms"
  "$BASE_DIR/snippets/Navbar"
  "$BASE_DIR/snippets/Footer"
  "$BASE_DIR/pages/HomePage.css"
  "$BASE_DIR/pages/AboutPage.css"
  "$BASE_DIR/pages/ProductPage.css"
  "$BASE_DIR/pages/ContactPage.css"
)

# Create directories
for DIR in "${DIRECTORIES[@]}"; do
  mkdir -p "$DIR"
done

# Create files
for FILE in "${FILES[@]}"; do
  touch "$FILE"
done

echo "Directory structure and files created successfully."
