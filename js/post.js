var account, uname, pass, comment = "";

function Post(account, uname, pass, comment) {
	this.account 	= account;
	this.uname 		= uname;
	this.pass 		= pass;
	this.comment 	= comment;
}

Post.prototype.addDataToPost = function() {
	
	return this.tmpPost = 
	{
		"account" 	: this.account,
		"uname" 	: this.uname,
		"pass" 		: this.pass,
		"comment" 	: this.comment
	};
}