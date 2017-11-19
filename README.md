# Advent
Traveling application that provides real time product recommendations for users

DEVPOST: https://devpost.com/software/advent-3nzfby

## Inspiration
Our inspiration begins with a common question. "What do you wanna do this weekend?" This question seems innocuous at first, but is teeming with social traps and pitfalls. You end up wondering "What if this guy doesn't like rollercoasters?" or "Do they have vegan options? I don't want to be THAT guy." or "In n out is garbo, and he loves it and wants to go there all the time". This is the problem we wanted to solve.

## What it does
Our app is firstly and foremost a real time recommendation system build on top of the Yelp API to grab details about the user's desired end location. We grab details about the user's travel that they plan to do, and predict where they want to go based on our weighted graph algorithm.

Our app then creates a list of products that the user might be interested in. For now, we've created a lot of correlations between snack foods and travel, correlating certain snack foods as being more popular with a certain time of travel and travel type. We gather our data using a lot of different studies conducted across the nation (refer to our READMEs for specific links).

After this, all the data is presented using our Ionic framework, allowing users to easily see their travel details as well as all their product recommendations.

## How we built it
We built our backend using Flask (Python 3.6) and our frontend using the Ionic framework (Angular 4). The data processing part was created using Python pandas, and Matplotlib was used for data visualization. Numpy was then used to find correlations and develop a general model/equation for our recommendations algorithm. Our App is build with actions-on-google.

Our backend is hosted on AWS currently.

We're augmenting our algorithm and NLP with IBM Bluemix before doing any processing on them for our outputs. This way, we reduce our error margins by at least 15%.

## Challenges we ran into
General issues with node versions. For some reason, google compute runs Node v 6.9.11 and I had some prior version installed, and it was a pain to convert over.

## Accomplishments that we're proud of
That we were able to push such a comprehensive app in such a short amount of time. It was my first time working with Pandas and data sets in general.

## What we learned
We learned a lot of different technologies in general, and it was fun trying to link them all together.

## What's next for Advent
Advent currently has a revenue model (People who select any of our prechosen items and purchase them will generate revenue). We will need to expand users and our model to account for other products. This will help create a more personalized experience for a lot of other users.

