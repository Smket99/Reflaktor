## Reflaktor Project
“Reflaktor” is a hostel management web application aimed at students on our campus. 

### `Deployed web app`
https://bits-hostel.herokuapp.com/

### `Contributors`
1) Smiket Barodia :alien: ([GitHub](https://github.com/Smket99))
2) Shubham Asopa :santa: ([GitHub](https://github.com/sammyasopa))
3) Hritik Singh Kushwah :superhero_man: ([GitHub](https://github.com/hritiksk392))
4) Akshit :mage_man: ([GitHub](https://github.com/akshitkh47612))
5) Bhavish Pahwa :surfing_man: ([GitHub](https://github.com/bp-high))
###  `Usage`
* This web application can help students to post their complaints directly on the System which becomes visible to the hostel supervisor, hostel representatives, and the respective hostel staff. 
* Students can give different tag attributes to the complaints using a drop-down menu that basically indicates the scope of the complaint ( example:- carpenter, plumber, electrician, IT ). 

* Hostel Representatives can also view the complaints and check which complaints have not been resolved and which are pending for a long time. 
* Different staff members can view and take up the complaints which are under their scope and after completion mark them completed. 
* Hostel Supervisors and Admin can see monthly reports of complaints and analyze the important issues.

###  `Product Backlog`
![image](https://user-images.githubusercontent.com/53102161/127733951-5d4c5e8c-ea05-4eda-ba4a-e4cb136ffa7d.png)

### `Use Case Diagram`
![image](https://user-images.githubusercontent.com/53102161/127734010-6d07d349-abd9-45fe-94df-da8d4d8ba112.png)

### `Class Diagram`
![image](https://user-images.githubusercontent.com/53102161/127734035-190cbc57-9419-43e1-903e-19f83329068e.png)

### `System Architecture`
![image](https://user-images.githubusercontent.com/53102161/127734069-80cd786e-7085-460b-bb66-d84bb0af4a2c.png)
### System design decisions based on our usage and use case for further development of the project
* We found it better to use a Monolith as it is simple to develop relative to Microservices and easier to deploy and Microservices often have problems related to security and network latency and microservices are more costly in terms of network usage and as our application is related to educational organisations so it’s better to have low latency.
* Also we use both RDBMS and NoSQL databases so that the Data that needs operations like joins to be performed can be stored in RDBMS, while others can be stored on NoSQL databases. 
* We use a database cache to help provide information which is frequently accessed, without having to query the databases. We did not use a CQRS based monolith because in our application there is no asymmetric factor of read and write requests. 
* Also CQRS is especially to be used when the number of reads is much greater than the number of writes which is not our case and hence it is not used. We use external analytical services for report generation by using a data streaming service and a big data processing platform. 
* These external systems can be further connected to Google Cloud ML systems and be used for further prediction and using this data we can train predefined models for further analysis at regular intervals.




