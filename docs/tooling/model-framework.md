# Model Framework

We have an ensemble of models in Google Sheets, designed for storing data and reporting on various aspects of the company, for example keeping track of service subscriptions, customers and resulting revenue, and team member attributes, including salaries. Most of these models also have TypeScript code living in Github repositories, containing customized code to execute the more involved processing not achievable with native GSheets functions.

As our models and the associated functionality have expanded, a strong need has developed to express a common framework for these models, including various aspects such as formalizing shared data structures, tracking how data is shared across the models, extracting commonly used functions to shared npm libraries, and implementing a CI/CD pipeline.

This aim of this section is to express this common framework, and thus serve as a guideline for current and new developers of our models. Google Sheets represent a very flexible environment, hence we ask all contributors to carefully follow these guidelines, to ensure we retain the much-needed coherence and structure across our models.

NB: This is very much a living and growing document, so if you have any suggestions on how to improve the framework, please create an issue in the relevant repository and/or initiate a conversation in Zulip.



## Importing data from one GSheet into another

Let's say there exists a sheet named `X` within the GSheet named `A`, and we need the data within sheet `X` for some calculations in the GSheet named `B`. There are two cases to consider:

### People with access to B also allowed access all of A

In this case, the following steps are needed:

* Make sure that GSheet `B` has a `MANIFEST` tab where GSheet A is imported, for example [here](https://docs.google.com/spreadsheets/d/1RsQjoMqQaw2Xv_Dk6UobmsBSnNJy2cGuKE57C2qIo2s/edit#gid=0). If setting up a new connection, you will need to click in column C of the `MANIFEST` to allow access.
* Within GSheet `B`, create a sheet named `A: X`, and change its colour to red (indicating it is an import). Import the necessary data from `X` by using an `IMPORTRANGE` statement based on the `MANIFEST`, for example [here](https://docs.google.com/spreadsheets/d/1RsQjoMqQaw2Xv_Dk6UobmsBSnNJy2cGuKE57C2qIo2s/edit#gid=926876263). The simplest option is to import all columns with a single `IMPORTRANGE` in cell `A1`. You can also import a subset of columns, making use of multiple `IMPORTRANGE` statements if necessary. However, please use `IMPORTRANGE` only in row 1 and not further down as well, to make the sheet easier for others to understand at a glace.
* For those instances in `B` where you need the data from `X`, you can now use a direct cell reference to the `A: X` sheet. The goal is not to use `IMPORTRANGE` in any other sheets apart from the `MANIFEST`, and the red reference sheets formatted like `A: X`.

### People with access to B not allowed access to all of A

In this case, people with access to GSheet `B` are allowed access to (all, or a subset of) the contents of `X`, but not necessarily to the other sheets in GSheet `A`. Allowing `B` access to `A` like we did in the `MANIFEST` in the previous section, can thus create privacy issues and is best avoided. Therefore, in this case, we do not use the `MANIFEST` and `IMPORTRANGE` as above. What we do instead is to have a script connected to `B`, pushing the necessary data from `X` into the red sheet named `A: X` within `A`.

Going forward, we should probably find a way to reflect this type of push in the `MANIFEST` of `A` as well.

### Notes

The guidelines above were chosen and applied across all our models, since this is what we have already been doing in most cases. The upside of these red `IMPORTRANGE` tabs are (a) they make it easy to understand at a glance which data flows into the GSheet in question, and (b) they dramatically simplify the searching algorithm used when refreshing the visualization created by the "GSheet Model Structure" project linked below.

However, one obvious downside is that they lead to duplication of data, which can be problematic in cases where the importing sheet is already very large.



## Visualizing the links between our models

The [GSheet Model Structure](https://github.com/company-os/gsheet-model-structure) project presents an automatically updated visualization of how the various GSheets in our ecosystem are connected. To see the plot, follow the Web App URL at the top of the `README.md` in that repo.



## Google Apps Script

Most of our GSheet models have a linked [Google Apps Script](https://www.google.com/script/start/) (GAS) project, which allows us to write customized code to process our GSheet data, far beyond the native formulaic capabilities of Google Sheets. Our framework for this is as follows:

### Source code

Source code is written in TypeScript. The source of truth for all source code is on Github, with one project per repository. The understanding is that the code on the `master` branch of the repository represents the code running in production on the associated spreadsheet.

### Deployment

Deployment of updates is not automatic, however, and occurs from the developer's local workstation. Once the code has been modified, [webpack](https://webpack.js.org/) (with [ts-loader](https://www.npmjs.com/package/ts-loader)) is used to transpile the TypeScript code to a JavaScript bundle, which is then pushed to the GAS project using [google/clasp](https://github.com/google/clasp).

### Scaffolding a new project

We have an in-house tool to facilitate setting up a new repository for such a project: [dreamsheets-scripts](https://github.com/product-os/dreamsheets-scripts). This tool was modelled after the [create-react-app](https://create-react-app.dev/) concept, thus handling the various dependencies and configuration details we need for our GAS projects under the hood. (It was initially based upon the [balena-google-apps-script-sheet-skeleton](https://github.com/balena-io-examples/balena-google-apps-script-sheet-skeleton) , which is now slightly out of date.)

`dreamsheets-scripts` works well, with the understanding that it currently lacks the "eject" mechanism known to create-react-app users. This mechanism would allow the developer to "eject" the project from the scaffolding framework, thus exposing all the configuration files, which may then be edited directly if this is needed for some reason. For `dreamsheets-scripts`, such an ejection would be a manual process, but it is very unlikely to be necessary anyway.

Thus, `dreamsheets-scripts `is currently the recommended method for launching a new GAS project for linking with a GSheet. Using this tool to create a dummy project is a useful way of familiarizing yourself with the basic elements of this aspect of our framework.

Some of our GAS projects have been created with `dreamsheets-scripts` from the start, while others (but not yet all) have been transitioned to using it as a dependency. An example of such a project is the [common-model](https://github.com/company-os/common-model).

### Exploring and managing the Apps Script Project

The GAS project associated with a GSheet can be accessed by opening the GSheet (for example the [Common Model](https://docs.google.com/spreadsheets/d/1mZEWN07RbIe4349suDLTGBjQPfb4FtYMInN3hbdUIeg/edit#gid=1850858318)), and selecting `Apps Script ` under the `Extensions` menu. The following useful sections can be viewed by selecting the appropriate tab on the left:

#### Editor

This is where you will see the transpiled code that was pushed to the project. The global functions originally defined in the `src/index.ts` file of your project are listed in the dropdown at the top, and can be run and debugged from the editor.

Keep in mind that changes to the code in the editor will **not** be persisted, since it will be overwritten during the next clasp push to the project. Therefore, please ensure that any upgrades or bug fixes are captured on the master branch through an appropriately approved PR, and pushed to the project using clasp.

#### Triggers

Automated triggers of the global functions are set up and maintained here.

#### Executions

This is where you can find data related to the function executions (both manual and triggered), including any console logs.

#### Project Settings

This section contains various self-explanatory settings, including:

* `Script ID`: this value is used in the `.clasp.json` file of your local clone of the codebase (or the `.env` if you are using `dreamsheets-scripts`) to ensure the code is pushed to the right GAS project.
* `Script Properties`: Key-value pairs that can be accessed by the codebase.

### How to deal with secrets

Although most of the Github repositories in our model ecosystem are private, we strive to configure them in such a way that they can be useful to a wider audience, and could be made public at some point in the future. On the other hand, the Google Sheets themselves often contain confidential data, and hence will not be made public.

It is therefore important not to store confidential data, for example API keys, in the repository itself. One alternative (which is adequate in most cases), is to have the code read such properties from the `Script Properties` of the GAS project mentioned in the section above, as detailed [here](https://developers.google.com/apps-script/guides/properties?hl=en). Keep in mind, however, that the `Script Properties` are visible to everyone with access to the associated GSheet.

### Recommended workflow for contributions

* Clone the relevant repository to your local machine.

* Install node modules (creating a `node_modules` folder) by running:

  ```bash
  $ npm install
  ```

* Create a new local git branch with your changes.

* Clone the associated Google spreadsheet (`File`, `Make a copy`). This will also clone the GAS project associated with the original spreadsheet.

* Within the new sheet, open the GAS view by going to `Extensions`, `Apps Script`. Find the `Script ID` under `Project Settings`, `IDs`. Update the value of `scriptId` in your local `.clasp.json` with this value (or, if you are using `dreamsheets-scripts`, the value of `DSX_SCRIPT_ID` in `.env`).

* To test your changes, build the bundle and push to the staging GAS project by running:

  ```
  $ npm run build
  $ npm run push
  ```

* If all your changes are working as expected in the staging environment, push your local branch to the relevant repository and create a pull request.

* Once your PR has been approved and merged to the master branch, and the `CHANGELOG.md` has been updated to the new release, pull the updated master branch to your local repository.

* Update the script ID in your local `.clasp.json` (or `.env`) to the value found under `Project Settings` of the production project.

* Run

  ```bash
  # Assuming you have already run npm install
  $ npm run build
  $ npm run push
  ```

* Refresh the production spreadsheet and do a final check that your changes are working as expected.



## Colour coding of sheets (tabs)

In general, we aim to use the following colour coding for sheets within the Google Sheets:

* Black: configuration sheets, mostly limited to the `MANIFEST`.
* Blue (#4a86e8): Sheets requiring manual data entry (possibly combined with formulae).
* Red (#ff0000): Sheets imported directly from other GSheets (treat as read-only).
* Imperial purple (#66023C): Sheets for which the contents are generated by scripts (treat as read-only).

This set is not yet universally adopted or enforced across our models, and could use some refinement and expansion, but is the closest thing we have to a colour coding standard at the moment.

