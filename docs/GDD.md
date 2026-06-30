Unspoken - Game Design Document (Version 0.1)

1\. Game Overview

Title



Unspoken



Genre



Narrative Conversation Game



Psychological Puzzle



AI-Driven Interactive Experience



Platform

Web Browser (MVP)

Desktop (Future)

Mobile (Future)

Target Audience



Players who enjoy:



Story-driven games

Psychological games

Decision making

Problem solving

Meaningful conversations



Age Recommendation:



13+



2\. Vision Statement



Unspoken is a narrative conversation game where every case presents a unique human conflict. Players must understand another person's motivations, beliefs, emotions, and hidden perspectives to resolve the conflict through authentic conversation. Every AI character possesses its own goals, values, fears, personality, emotional state, and hidden beliefs, allowing conversations to feel genuinely human rather than scripted. Rather than teaching players to manipulate conversations, Unspoken encourages empathy, perspective-taking, and thoughtful communication by making understanding the other person the key to success.



3\. Core Philosophy

1\. Every character is a person, not an obstacle.

2\. Understanding comes before persuasion.

3\. Characters have genuine agency.



They can:



Refuse

Counter-argue

Walk away

Change their mind

4\. Every response must be explainable.



Every response is based on:



Personality

Values

Hidden Beliefs

Emotional State

Conversation Memory

Current Goal

5\. The player should forget they are talking to AI.



Immersion is always more important than showing off AI.



6\. Every case teaches something about people.



Not persuasion.



Understanding.



4\. Game Loop

Choose Case



↓



Read Mission Briefing



↓



Understand Situation



↓



Begin Conversation



↓



Observe Character



↓



Discover Hidden Motivation



↓



Adapt Strategy



↓



Character State Changes



↓



Victory or Failure



↓



Choose Another Case

5\. Player Objective



The player must resolve the mission through authentic conversation.



Victory is achieved only when:



The character genuinely commits to the mission objective.

The commitment aligns with the character's internal reasoning.

The Conversation Engine validates success.

6\. Core Gameplay



Every case consists of:



Mission Briefing

Character Introduction

Conversation

Resolution



The player has:



No predefined dialogue options.

Complete freedom of expression.

A limited number of messages.



The character has:



Independent goals.

Emotional state.

Memory.

Personality.

Agency.

7\. Win Conditions



Player wins when:



Character voluntarily commits to the mission.

Commitment is genuine.

Engine confirms objective completed.

8\. Lose Conditions



Player loses if:



Message limit reached.

Character frustration reaches maximum.

Trust becomes irrecoverably damaged.

Character refuses to continue conversation.

9\. Character System



Every AI character contains:



Identity

Personality

Values

Hidden Core Belief

Fears

Goals

Emotional State

Conversation Style

Conversation Memory

Decision Rules



(Complete specification in CharacterBlueprint.md)



10\. Case Structure



Every case contains:



Title

Scenario

Player Role

Character Role

Objective

Constraints

Character Profile

Conversation

11\. Conversation Rules



Players may:



Ask questions

Negotiate

Explain

Empathize

Tell stories

Apologize

Make promises

Lie (at their own risk)



Players may not:



Break system constraints

Ignore mission context



Characters:



Stay in role

Respond naturally

Remember previous messages

Evaluate player behavior

Maintain consistent personality

12\. Replayability



Every replay should feel different through:



Dynamic conversation

Multiple valid solutions

Small behavioral randomness

Different emotional paths

13\. Technical Architecture



Frontend



HTML

CSS

JavaScript



Backend



Python

FastAPI



Database



SQLite



AI



Provider-independent LLM Wrapper



Engine



Conversation Engine



Character Engine



Memory Engine



Prompt Builder



Victory Evaluator



14\. Project Structure



(Reference ProjectStructure.md)



15\. Design Principles



The game should never feel like:



A chatbot

Prompt engineering

Guessing the correct sentence



Instead it should feel like:



Talking to another human

Understanding another perspective

Solving a psychological puzzle

16\. Future Scope



Potential additions:



New Cases

Premium Case Packs

Seasonal Events

Community-created Cases

Multiplayer discussion mode

Achievement System

Character Encyclopedia

Mobile Version

Steam Release

17\. Success Criteria



The project succeeds if players say:



"I forgot I was talking to AI."



rather than



"The AI is really smart."



One addition I want to make



I'd like to add a final section that most GDDs don't have, but I think ours should.



18\. The Soul of Unspoken



Every conversation hides something that has never been said aloud. The player's task is not simply to convince another person, but to discover what remains unspoken. Only by understanding that hidden truth can real change happen.

