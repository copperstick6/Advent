import itemarrays
import random
#ASIN.1=B01J94SWWU&Quantity.1=1&add=add
baseUrl = "https://www.amazon.com/gp/aws/cart/add.html?AWSAccessKeyId=AKIAIHDFCICGPP55HFFA&AssociateTag=copperstick6-20&"
def getFoodLink():
	allItems = []
	allItems.extend(itemarrays.getSalty())
	allItems.extend(itemarrays.getSweet())
	allItems.extend(itemarrays.getMeat())
	allItems.extend(itemarrays.getHealthy())
	food1 = random.choice(allItems)
	allItems.remove(food1)
	food2 = random.choice(allItems)
	allItems.remove(food2)
	food3 = random.choice(allItems)
	allItems.remove(food3)
	food4 = random.choice(allItems)
	allItems.remove(food4)
	food5 = random.choice(allItems)
	allItems.remove(food5)
	urlCopy = baseUrl + "ASIN.1=" + food1 + "&Quantity.1=1&"
	urlCopy = urlCopy + "ASIN.2=" + food2 + "&Quantity.2=1&"
	urlCopy = urlCopy + "ASIN.3=" + food3 + "&Quantity.3=1&"
	urlCopy = urlCopy + "ASIN.4=" + food4 + "&Quantity.4=1&"
	urlCopy = urlCopy + "ASIN.5=" + food5 + "&Quantity.5=1&add=add"
	return urlCopy
