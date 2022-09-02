# Support Tickets

Jellyfish aggregates user support requests from several places into support tickets.

These support tickets are like Threads in that they are just conversations. 

In fact, support threads have no additional functionality from a Thread except for reacting to certain hashtags:

 - `#status` followed by a message, will include that message in the highlights under the Info panel of a ticket.

 - `#summary` followed by a message, will close the ticket. This effectively moves the ticket out of the queue people typically look at.

 - `#pendinguserresponse` will move the ticket from "pending agent response" queue which is actively monitored, into the "pending user response" queue. This queue is for tickets that are waiting for a response from the user. These tickets will automatically get placed back into the pending agent response queue after a few days if no response is given. 

 - `#pendingengineerresponse` will move the ticket to another queue which is not actively monitored. This is used to give someone time to investigate a ticket. After a few days the ticket will be placed back into pending agent response if no response is added.

For more information about support tickets see [Ticket states](https://github.com/people-os/process/blob/master/process/support/support-ticket-flow.md#ticket-states) documentation.
