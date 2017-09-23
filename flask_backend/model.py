start_location = None
destination = None
travel_option = None

start_year = None
start_month = None
start_day = None
start_hour = None

end_year = None
end_month = None
end_day = None
end_hour = None

email = None

number_of_adults = None
number_of_children = None

def set_starting_location(location):
    global start_location
    start_location = location

def set_destination(location):
    global destination
    destination = location

def set_email(_email):
    global email
    email = _email

def set_passengers(adults, children):
    set_number_of_adults(adults)
    set_number_of_children(children)

def set_number_of_adults(adults):
    global number_of_adults
    number_of_adults = adults

def set_number_of_children(children):
    global number_of_children
    number_of_children = children

def set_travel_option(option):
    global travel_option
    travel_option = option

def set_start_time(year, month, day, hour):
    global start_year, start_month, start_day, start_hour
    start_year = year
    start_month = month
    start_day = day
    start_hour = hour

def set_end_time(year, month, day, hour):
    global end_year, end_month, end_day, end_hour
    end_year = year
    end_month = month
    end_day = day
    end_hour = hour

def get_start_location():
    return start_location

def get_destination():
    return destination

def get_email():
    return email

def get_number_of_adults():
    return number_of_adults

def get_number_of_children():
    return number_of_children

def get_travel_option():
    return travel_option

def get_start_time():
    global start_year, start_month, start_day, start_hour
    return (start_year, start_month, start_day, start_hour)

def get_end_time():
    global end_year, end_month, end_day, end_hour
    return (end_year, end_month, end_day, end_hour)
