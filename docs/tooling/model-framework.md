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