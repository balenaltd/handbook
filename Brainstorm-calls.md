# Brainstorm calls 

Brainstorm calls are core to how we work and reflect our approach for finding the highest-possible quality answer to the issues we face. You can read more about the **brainstorm!** game [here](https://docs.google.com/document/d/1mHb-D2vJxufa8OZPU55V5WBIXuQ44MNL4fcXw52lEe8/edit#). Brainstorm calls are scoped by loop and type. 

## Brainstorm types
* `product` for questions around `what` we want to do (i.e. what can be done to reduce a certain kind of friction for users)
* `architecture` or `arch` for `how` questions, such as “how should a certain feature be implemented”

## Loop specific brainstorm calls 

### balena.io brainstorms
* product - _see the separate wiki page under the meetings section_

* arch - _see the separate wiki page under the meetings section_

* commercial
> Commercial calls take place once a week and are led by the commercial team. It is the time and (virtual) place where we discuss the sales/customer success team process, pricing plans, and commercial strategy. Everyone is welcome to join.
> See the commercial brainstorm notes document [here](https://docs.google.com/document/d/1L-p1Xkz0t1-wKvV_vp87DnRuAWS-1lhR5wObD7YId80/edit).

* outreach
> Outreach brainstorm calls take place once a week and are lead by the outreach team. Brainstorm prompts and items usually come up when we need the collective thinking power and ideas from the group. Add items to discuss with the `#outreach` tag in `s/Outreach` in FlowDock, and please include context such as links, docs, etc.. Everyone is welcome to join. 
> Navigate Outreach brainstorm calls and topics in Jellyfish.

### productOS brainstorms
* LoopMVP product
* LoopMVP arch
> _You can find more information about loopMVP in the [productOS draft spec](https://docs.google.com/document/d/17_EnBWn_JKQzlAE98UiHp4cuy-l50Ist2_q-c24ojds/edit#heading=h.o9drtpe4wedmunder) and the [productOS team manual](https://docs.google.com/document/d/18G1vzYte-wSmoVLmPafG4gWm6eJ4ZUDCs40llWgc9s8/edit#heading=h.lj0g2s7qd8jq)._

### balenaLabs brainstorm - product/arch combined
> BalenaLabs calls take place once a week and are led by the balenaLabs team. It is the time and (virtual) place where we discuss labs projects, blocks and bovine feet. Everyone is welcome to join.
> We track and document our topics in Jellyfish.

### teamOS brainstorm - product/arch combined
> TeamOS calls take place once a week and are led by the teamOS team. It is the time and (virtual) place where we discuss team processes, policies, team feedback and the overall user experience for the team. Everyone is welcome to join.
> See the teamOS brainstorm notes document [here](https://docs.google.com/document/d/1o8p8irS_cdEIM2FHUsP6HzbSMpGCCac_Th9NIbfNS04/edit#).

### companyOS brainstorm - product/arch combined
> CompanyOS calls take place once a week and are led by the team members that form the companyOS team. It is the time and (virtual) place where we discuss our company architecture - legal, financial and operational. Everyone is welcome to join.
> See the companyOS brainstorm notes document [here](https://docs.google.com/document/d/1UF6VolqWd7CpQ1GLwYvftHJj7Agf6Kr-CGpLW28Ry80/edit?usp=sharing).

## How to raise an item for a brainstorm call
Each brainstorm call has a hashtag which when used on FD along with a short description of the problem and possibly a suggested solution to be discussed. Your message will create a Jellfish brainstorm topic card and given the appropriate category (i.e. loop). Read the hashtag section in the [Flowdock guide](https://github.com/balena-io/balena-io/wiki/Flowdock) to get more information and see some examples. Make sure that Hubot is added in the flow for hashtags to work and although you can use any hashtag in any flow, it is always better to raise a brainstorm using the relevant flow to generate valuable discussions, eg. using #commercial in the r/commercial flow. Sometimes there are more flows that seem relevant to raise a brainstorm item or a flow might be invite-only if it contains sensitive information, so you can decide what makes more sense! You can type `Hubot, show me your hashtags` to see the active hashtags you can use.

## How to run a brainstorm call

Brainstorm calls are for everyone to both participate and run. I'll take the balena-io architecture call as an example, but the same principles and tooling applies to any other brainstorm call.

Once a team member raises an item for a brainstorm call as described above, that will be created in Jellyfish marked with the appropriate loop and category. You can find all submitted items [here](https://jel.ly.fish/view-all-brainstorm-topics). Once you are on that page, it is advised that you apply the appropriate filter for the brainstorm call you are running (eg. `category is "balena-io architecture"`), and save the view. Once saved, it will appear on the left-hand side menu which you can easily access later on.

A couple of hours before the scheduled call, ping everyone in Flowdock to notify them that they need to participate in the brainstorm (you can do that using [this script](https://gist.github.com/LucianBuzzo/c04bfc4b343d233737e7c5f9b552d535) that you run inside the JF console and then paste it in Flowdock). Once everyone joins the call, you can share the list of topics on your screen and start tackling them one by one.

When it comes to prioritizing topics, it's a good practice to ask if there is anything urgent that blocks them from progressing on their project. If there is nothing that is urgent, you can do them starting from the oldest first. Some things to keep in mind during a brainstorm:
- If you see a topic is taking too long to resolve or is going nowhere, suggest having an ad-hoc call so other topics can be handled as well
- Make sure people introduce the problem first before jumping to a solution. In general, you need to moderate [these principles for participating in a brainstorm](https://docs.google.com/document/d/1mHb-D2vJxufa8OZPU55V5WBIXuQ44MNL4fcXw52lEe8/edit)
- Remind people to summarize and close topics, especially important until everyone gets used to Jellyfish
- As a general rule, it's good to verbally summarize what was discussed around a topic, just to make sure that everyone is on the same page.
