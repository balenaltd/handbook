# Sales Resources
* [Standard demo](https://github.com/resin-io/hq/wiki/Standard-Sales-Demo)
* [Post-sales master checklist](#post-sales-master-checklist)
* [Pricing Guidelines](#pricing-guidelines)
* [Lead Qualification Tasks](#lead-qualification-tasks)
* [Sales Content Index](https://docs.google.com/document/d/1aHO7hNgISnEkhJ4Ij0ySeqIWc5Uc1FKn8YjXbEuU7Xg/edit)


##  Post-Sales Master Checklist

### Administrative Tasks
Things to update:
~~* Salesforce~~
* Recurly (if not self serve)
* Balena Database via Admin Panel (if not self served)
    * Mark user(s) as paid and grant support access under `Users`
    * Add Recurly ID and subscription information to paying org under `Organizations`
* Front *
_Only premium customers_
* Zendesk *
_Only premium customers_
* Trello Customer board
* ARR Doc
* Calendar
* Post-sales disco call _(if fully self-serve)_
* Logo request
* Flowdock (if not self serve)

### Customer Satisfaction Tasks
* All Paid Accounts
* Get usernames and email for all users associated with the account, who should have access to the private support chat privilege 
* Follow on Twitter, Facebook, Instagram or any relevant social media accounts
* Request logo for customer page
* Case study
* Premium Accounts, also: 
* Schedule support onboarding / Intro to Kostas
* Send swag pack/thank you note?


## Instructions

~~### Updating Salesforce
Now that the customer has agreed to buy, you will need to update the salesforce record to reflect a “closed won” sales opportunity. Before you can “close won” an opportunity, you will need the following:
* Existing “Account” and “opportunity” in Salesforce -- Should already be created, but create if not
* Pricing plan the customer wants to purchase
    * Along with additional devices or users they want to add

To update the Salesforce opportunity:        

1. Find and open the opportunity page for the account
2. Click the “Edit” button near the top of the page
3. In the “Opportunity Information” section of the page, edit these sections with the appropriate info:
    * “Product”: Add/modify the product if necessary
    * “Type”: Change to “Customer - New”
    * “Use Case”
    * “Pricing Tier”
    * “Close Date”: Should be today’s date/the day you send the invoice
    * “Stage”: Move to “Closed Won”
4. If the opportunity was generated through self-serve billing, the Recurly account code must be entered in the Account ID field under the Salesforce account.~~

### Updating Recurly
**Note: Self-serve customers will have most info already entered**

To send an invoice to new customers, you’ll first need the following:
* Full name of person signing the invoice
* Email address of signee and other relevant cc’s (preferably work email) 
* Company name
* Username for customer’s main resin account
    * You can find this in one of two places: on the account page in Salesforce, and in the resin admin database
* Account code from salesforce (if not auto-generated through self-signup):
    * Historically we use the account code generated in Salesforce. You can get this info by going to the customer’s account page (in Salesforce) and copying everything after “salesforce.com/” in the url
    * Ex: 0016100000rwZ68 is the account code for Utility Warehouse 
    * Note: self-serve customers have an auto-generated account code to enter into Salesforce 

Now that you have that information, you will need to create an account in Recurly: 
   
1. Navigate to https://resin.recurly.com/accounts/new
2. Fill out all of the “Basic Information” and “Contact Information” sections    
3. Click “Create” in the lower left-hand corner

Now that the account is created, you need to add the appropriate plan and send the invoice out:

1. Click “Add Subscription” for the base plan in the upper right of the page
2. From here, update the following information:
    * “Plan”: Our different pricing plans have already been created in Recurly. Make sure you choose right one based on the plan and payment terms (monthly, annually, qtrly)
    * “Timing”: Future Start Date - Pick the next round hour
    * “Collection Method”: Manual (Send Invoice)
3. Click “Add Subscription” in the lower left of the page

4. Add another subscription for Add-ons by clicking "Add Subscription" again
    * “Add-ons”: This is where you can add more devices or users beyond the base plan (e.g. For a Pilot plan with 60 devices -- 10 more than the base -- add 10 device “add-ons” 
    * “Timing”: Future Start Date - Pick the exact time/date as the base plan
    * “Collection Method”: Manual (Send Invoice)  
5. Click “Add Subscription” in the lower left of the page

### Updating the Admin Database
**Note: Self-serve customers will have the primary user already entered - it will be necessary to manually add additional users on Pilot plans and above**

#### Mark users as paid 

To assure the new customer receives the appropriate support entitlement for their plan, the admin database must be updated. Updating the database is straightforward, however, every user associated with the customer must be updated separately, so you will need all of their usernames (note: this will need to be continually updated over the course of the next few weeks/months to make sure it is accurate).

To update the database:  
  
1. If on Org/Enterprise plan, ask customer for list of users who will get access to support
1. https://admin.resin.io/users (you’ll need to be logged into your resin admin account)
1. Click “users” on the navigation bar
1. Search for the user using their username 
1. Click the row associated with the user
1. Update:
    * Billing Account Code (same as Recurly Account Code) only for the individual responsible for billing
    * Billing plan
    * Privilege (Note: you have to click “add” for the support entitlement to be added)
1. “Save Changes”
1. Repeat for all users in the company

#### Create organization 

Until organizations support is released, we need to manually create an organization in the resin database for each new customer account. You can do that via the admin panel from https://admin.resin.io/organizations. 

Click "New Organization" to create a new org. Give the org the same name as the customer account in Recurly, the ARR sheet, etc. Search for known members of the org (be sure to add the member associated with the Recurly account via their Billing Account Code!). Click "add" for each member, and then click "save." 

### Updating Front (premium only)
To make sure Premium (SLA) customers have the correct support prioritization (i.e. premium accounts get a response inline with their SLA), all of the premium users have to be added to the "Premium Customers" group.

From the Front web client:

1. Click on the “contacts” icon in the lower left of the screen
1. Search for the contact using their email address and the search bar
1. If you can’t find the contact, you will need to manually add them 
    * “New Contact” button is to the left of the search bar
1. Click “Add to group +”
1. Select “Premium Customers" for customers with an SLA

### Updating Zendesk (premium only)
For premium customers -- SLA is included with their contract -- we will need to add them to Zendesk…talk to Sonya.

### Updating the Customer Trello board
If the customer already has a Lead card, move it to the Customer board; otherwise, create a new customer card.

### Updating the ARR Doc

Update the [ARR Model here](https://docs.google.com/spreadsheets/d/1yx4HWumAy23DGWySnKXQ2qORx1ziELiFnytT-QBFFqE/edit#gid=1831480890)

A few things to make sure:
* Link to Recurly on first tab (salesforce otherwise)
* Start date should match Salesforce
* Devices/developers match Recurly and Salesforce

### Calendar
Enter calendar reminder for product follow up in 6 months

### Post-sales disco call _(if fully self-serve signup)_
Contact customer to learn about their project, use case, projected volumes, etc.

Use the 
[disco call template](https://docs.google.com/document/d/13fVFt9xRd84bLZJGn8ISowv6igS3DquOOn84SBNFrsc/edit)

### Logo request
Ask customer for their logo to put on our website

## Pricing Guidelines

For device volume and prepayment discounts, see https://github.com/balena-io/volume-pricing (as of Dec 6 2018, the `users-volume-discount` branch was the most recent)


***
## Lead Qualification Tasks

**BH Note 20170505:** This is a temporary doc to track some of the outstanding items to more fully polish up our process of routing and qualifying new sales leads. 

Items for the front-end team or data team 
* is it possible to have signups immediately associate with salesforce such that the salesforce sidebar will by default tell me who owns the lead, its status etc. right now i appears as if it comes from newsignups@Resin.io so all sidebar info based on a lookup of that email address
* Contact forms on our website (primarily the demo form) should create new leads in salesforce
* Demo requests should go to /Sales instead of /Hello
* Enhance tableau report or admin panel so we can see entitled devices, overage, email address and company name in same pane of glass 
* Sign up and contact forms should have (optional) fields for address, phone, title, etc to populate salesforce records

Items related to the tools we use 
* Figure out how to get salesforce sidebar to load for all users, regardless of whether they have a salesforce account. Other than sharing sfdc credentials, is there a good way to do this? 









