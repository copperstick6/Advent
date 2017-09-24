import xlrd
book = xlrd.open_workbook("snack_data.xlsx")

def getSalty():
	sh = book.sheet_by_index(2)
	array = [];
	for rx in range(1, sh.nrows):
	    array.append(sh.cell(rx,0).value)
	return array

def getSweet():
	sh = book.sheet_by_index(3)
	array = [];
	for rx in range(1, sh.nrows):
	    array.append(sh.cell(rx,0).value)
	return array

def getMeat():
	sh = book.sheet_by_index(4)
	array = [];
	for rx in range(1, sh.nrows):
	    array.append(sh.cell(rx,0).value)
	return array

def getHealthy():
	sh = book.sheet_by_index(5)
	array = [];
	for rx in range(1, sh.nrows):
	    array.append(sh.cell(rx,0).value)
	return array
