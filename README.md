Task Management App Readme

To use it simply fork the repo and open index.html with live server.

This task management app lets you add tasks with a task, category, and deadline. If the deadline has already past
when submitted it will be added as "Overdue". Otherwise it will be "In Progress". From there you can sort by category or
status or both. You can also change the status after a task has been submitted.



Reflection:
The most difficult part of this assignment was doing the javascript. The best approach was to do things sequentially and work on things that built off each other. To that respect I focused on writing all the html I would need to be my structure which honestly wasn't that much. 

Once I had that, I started working on submitting items and having them show on screen. This was straightforward since we have already done stuff like it.

After that I worked on the filter for both. Getting the category filter correct gave me a bit of trouble when it came to updating the category select options after a new task got submitted. I way I initially implemented it the categories that were already there got remade. For example it would go from 2 -> 5 with 2 repeats instead of 2 -> 3. I found the much cleaner approach to use a Set for the categories. I could then make a new set with containing the new addition and use the difference() method to compare them.

There was a lot of small tweaks that had to be made and googling to find a sufficient method.

As the code got larger and larger I found it continually harder to navigate through, make changes, and find the section I was looking for.

If I had more time I would continue working on the css to make it look nicer and potentially add media queries.