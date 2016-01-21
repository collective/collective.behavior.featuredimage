*** Settings ***

Documentation  Test content creation and validation with fields from the Featured Image behavior
Resource  plone/app/robotframework/keywords.robot
Variables  plone/app/testing/interfaces.py

Library  Remote  ${PLONE_URL}/RobotRemote

Suite Setup  Open Test Browser
Suite Teardown  Close all browsers

*** Variables ***

${title_selector}  input#form-widgets-IDublinCore-title
${featuredimage_enabled_selector}  input#form-widgets-IFeaturedImage-featuredimage_enabled-0
${featuredimage_quote_selector}  input#form-widgets-IFeaturedImage-featuredimage_quote
${featuredimage_author_selector}  input#form-widgets-IFeaturedImage-featuredimage_author

*** Test Cases ***

Test CRUD
    [Tags]  Expected Failure

    Enable Autologin as  Owner
    Go to Homepage

    Create  Extra! Extra!
    Page Should Contain  Item created
    Page Should Contain Element  xpath=//meta[@property='og:image']
    Page Should Contain Element  xpath=//meta[@name='twitter:image']

    # we can also edit it
    Update  Give me six hours to chop down a tree and I will spend the first four sharpening the axe.  Abraham Lincoln
    Page Should Contain  Changes saved
    Page Should Contain Element  xpath=//meta[@property='og:image']
    Page Should Contain Element  xpath=//meta[@name='twitter:image']

    Click Link  Extra! Extra!
    Delete

*** Keywords ***

Click Add Dexterity Item
    Open Add New Menu
    Click Link  css=a#dexterity-item
    Page Should Contain  Dexterity Item

Create
    [arguments]  ${title}

    Click Add Dexterity Item
    Input Text  css=${title_selector}  ${title}
    Click Link   Featured Image
    Select Checkbox  css=${featuredimage_enabled_selector}
    # freezing when click on save.. don't know why
    # it is not calling the update_featuredimage event
    Click Button  Save

Update
    [arguments]  ${featuredimage_quote}  ${featuredimage_author}

    Click Link  link=Edit
    Click Link  Featured Image
    Input Text  css=${featuredimage_quote_selector}  ${featuredimage_quote}
    Input Text  css=${featuredimage_author_selector}  ${featuredimage_author}
    Click Button  Save

Delete
    Open Action Menu
    Click Link  css=a#plone-contentmenu-actions-delete
    Click Button  Delete
    Page Should Contain  Plone site
