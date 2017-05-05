BH Note 20170505: This is a temporary doc to track some of the outstanding items to more fully polish up our process of routing and qualifying new sales leads. 

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