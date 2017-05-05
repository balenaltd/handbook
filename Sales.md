# Sales Resources
* [Standard demo](https://github.com/resin-io/hq/wiki/Standard-Sales-Demo)
* [Post-sales master checklist](#post-sales-master-checklist)
* [Lead Qualification Tasks](#lead-qualification-tasks)

##  Post-Sales Master Checklist

### Administrative Tasks
Things to update:
* Salesforce
* Recurly
* Admin Database
* Front
* Zendesk*
_Only premium customers get access to Zendesk_
* Intercom
* ARR Actuals Doc

### Customer Satisfaction Tasks
* All Paid Accounts
* Get usernames and email for all users associated with the account, who should have access to the private support chat privilege 
* Follow on Twitter, Facebook, Instagram or any relevant social media accounts
* Request logo for customer page
* Case study
* Premium Accounts, also: 
* Schedule support onboarding / Intro to Sonya
* Send swag pack/thank you note?


## Instructions

### Updating Salesforce
Now that the customer has agreed to buy, you will need to update the salesforce record to reflect a “closed won” sales opportunity. Before you can “close won” an opportunity, you will need the following:
* Existing “Account” and “opportunity” in Salesforce -- Should already be created, but create if not
* Pricing plan the customer wants to purchase
    * Along with additional devices or users they want to add

To update the Salesforce opportunity:        

1. Find and open the opportunity page for the account
2. Click the “Edit” button near the top of the page
3. In the “Opportunity Information” section of the page, edit these sections with the appropriate info:
    * “Type”: Change to “Customer - New”
    * “Use Case”
    * “Pricing Tier”
    * “Close Date”: Should be today’s date/the day you send the invoice
    * “Stage”: Move to “Closed Won”
4. In the “Amounts” section of the page, edit the sections with the appropriate info:
    * “Amount”: Make sure this is amount amortized for the year (not monthly amount)
    * “# Devices”: Total number of devices: base plan + add-ons 
    * “# Developers”: Total number of users: base plan + add-ons

### Updating Recurly
To send an invoice to new customers, you’ll first need the following:
* Full name of person signing the invoice
* Email address of signee and other relevant cc’s (preferably work email) 
* Company name
* Username for customer’s main resin account
    * You can find this in one of two places: on the account page in Salesforce, and in the resin admin database
* Account code from salesforce:
    * Historically we use the account code generated in Salesforce. You can get this info by going to the customer’s account page (in Salesforce) and copying everything after “salesforce.com/” in the url
    * Ex: 0016100000rwZ68 is the account code for Utility Warehouse 

Now that you have that information, you will need to create an account in Recurly: 
   
1. Navigate to https://resin.recurly.com/accounts/new
2. Fill out all of the “Basic Information” and “Contact Information” sections    
3. Click “Create” in the lower left-hand corner

Now that the account is created, you need to add the appropriate plan and send the invoice out:

1. Click “Add Subscription” in the upper right of the page
1. From here, update the following information:
    * “Plan”: Our different pricing plans have already been created in Recurly. Make sure you choose right one based on the plan and payment terms (monthly, annually, qtrly)
    * “Add-ons”: This is where you can add more devices or users beyond the base plan (e.g. For a Solo plan with 12 devices -- 2 more than the base -- add 2 device “add-ons”
    * “Collection Method”: Manual (Send Invoice)
1. Click “Add Subscription” in the lower left of the page

### Updating the Admin Database
To assure the new customer receives the appropriate support entitlement for their plan, the admin database must be updated. Updating the database is straightforward, however, every user associated with the customer must be updated separately, so you will need all of their usernames (note: this will need to be continually updated over the course of the next few weeks/months to make sure it is accurate).

To update the database:  
  
1. If on Org/Enterprise plan, ask customer for list of users who will get access to support
1. https://admin.resin.io/users (you’ll need to be logged into your resin admin account)
1. Click “users” on the navigation bar
1. Search for the user using their username 
1. Click the row associated with the user
1. Update:
    * Billing plan
    * Privilege (Note: you have to click “add” for the support entitlement to be added)
1. “Save Changes”
1. Repeat for all users in the company


### Updating Front
To make sure customers have the correct support prioritization (i.e. premium accounts get a response inline with their SLA), all of the users have to be added to the appropriate “group”.

From the Front web client:

1. Click on the “contacts” icon in the lower left of the screen
1. Search for the contact using their email address and the search bar
1. If you can’t find the contact, you will need to manually add them 
    * “New Contact” button is to the left of the search bar
1. Click “Add to group +”
1. Two options:
    * “Paid Customer”: for customers that DO NOT have an SLA
    * “Premium Customer”: for customers with an SLA

### Updating Zendesk
For premium customers -- SLA is included with their contract -- we will need to add them to Zendesk…talk to Sonya.

### Updating Intercom 
TBD

### Updating the ARR Actuals Doc
Update the [doc here](https://docs.google.com/a/resin.io/spreadsheets/d/1H1KROKi-GRjEczy6oBnAL0xtLCaMDz9ep9019dhBIf4/edit?usp=sharing).

A few things to make sure:
* Link to recurly (salesforce otherwise)
* Start date should match salesforce
* devices/developers match recurly and salesforce


***
## Lead Qualification Tasks

**BH Note 20170505:** This is a temporary doc to track some of the outstanding items to more fully polish up our process of routing and qualifying new sales leads. 

Items for the front-end team or data team 
* Contact forms on our website (primarily the demo form) should create new leads in salesforce
* We should get rid of the reliance on zapier and just have our sign up form (for free accounts) generate new leads in salesforce directly
* Enhance tableau report or admin panel so we can see entitled devices, overage, email address and company name in same pane of glass 

Items for PA and BH to tackle
* Investigate simple lead nurturing campaigns to drop commercially viable leads into => auto-archive at the end
* Refine industry picklist and make consistent across leads/account
* Delete old recurly plans (they will stay active for existing custoemrs) 
* Create a rule in salesforce that auto-archives any open leads more than XX days old (30?)

Items related to the tools we use 
* The "Create lead" button in front sidebar does not properly map first name and last name to salesforce
* We should map new "lighthouse" tag in front with checkbox in salesforce
* Figure out how to get salesforce sidebar to load for all users, regardless of whether they have a salesforce account. Other than sharing sfdc credentials, is there a good way to do this? 



