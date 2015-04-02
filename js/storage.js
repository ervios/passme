var storageName = "kryptonite";
/*var jsonData;
var posts;
*/

function Storage() {
	/*
	if (this.getAllPosts() === null) {
		this.jsonData = {};
		posts = [];
		jsonData.posts = posts;
	} else {
		this.jsonData = getAllPosts();
	}
	
	this.jsonData = {};
	*/
}

Storage.prototype.addToJSON = function(postObj) {
	//console.log(postObj);
	//jsonData.posts.push(postObj);
}

Storage.prototype.getAllPostsInString  = function() {
	return localStorage.getItem(storageName);
}

Storage.prototype.getAllPosts = function() {
	return JSON.parse(localStorage.getItem(storageName));
}

Storage.prototype.storeNewPost = function(jsonData) {
	localStorage.setItem(storageName, JSON.stringify(jsonData));
}

Storage.prototype.removeStorage = function() {
	localStorage.removeItem(storageName);
}




/*


Post.prototype.storePost = function() {
	jsonData.posts.push(this);
	localStorage.setItem(storageName, JSON.stringify(jsonData));
	console.log("Stored")
	console.log(JSON.stringify(jsonData));
}

Post.prototype.deletePost = function(id) {
	jsonData.posts.splice(id);
	localStorage.setItem(storageName, JSON.stringify(jsonData));
	console.log("Deleted")
	console.log(JSON.stringify(jsonData));
}

function addPost() {
	var account = "qwq234eqw";
	var uname 	= "qwemewqewq";
	var pass 	= "e2345";
	var comment = "h22j";
	var post = new Post(account, uname, pass, comment);
		post.storePost();	
}
*/