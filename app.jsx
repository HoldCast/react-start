class Comment extends React.Component{
    render(){
        return (
            <div>
                <div className="comment-body">
                    <strong>content:</strong>{this.props.children}
                </div>
                <div className="comment-author">
                    <strong>author:</strong>{this.props.author}
                </div>
            </div>
        )
    }
}


class CommentForm extends React.Component {

    handleSubmit(e){
        e.preventDefault();
        const author = this.refs.author.getDOMNode().value.trim();
        const content = this.refs.content.getDOMNode().value.trim();
        const form = this.refs.form.getDOMNode();
        console.log(author,content,form);
        form.reset();
        //将提交的数据，传递给调用者的属性
        this.props.onSubmit({author:author,content:content});
    }

    render() {
        return (
            <form className="comment-form" ref="form"
                onSubmit={e => {this.handleSubmit(e)}}
            >{/*ref用来获取表单数据*/}
                <input type="text" placeholder="Your name" ref="author"/><br/>
                <input type="text" placeholder="Your comment" ref="content"/><br/>
                <input type="submit" value="submit"/>
            </form>
        );
    }
}

class CommentList extends React.Component {
    render() {
        let commentListNode = this.props.comments.map(function (value,index) {
            return <Comment author={value.author} key={'comment' + index}>
                {value.content}
            </Comment>
        });

        return (
            <div className="comment-list">
                {/*此处的组件在上面定义*/}
                {/*<Comment author="Leon1">
                    this is my comment1
                </Comment>
                <Comment author="Leon2">
                    this is my comment2
                </Comment>
                <Comment author="Leon3">
                    this is my comment3
                </Comment>*/}

                {commentListNode}
            </div>
        );
    }
}


//组件嵌套
class CommentBox extends React.Component {
    constructor(props){
        super();
        this.state = {
            /*comments: [
                {author: 'leon1',content: 'content11111'},
                {author: 'leon2',content: 'content22222'},
                {author: 'leon3',content: 'content33333'},
            ]*/
            comments:　props.comments
        }
    }

    loadData(){
        //服务器渲染
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: data => { //箭头函数只有一个参数的时候，可以省略括号，并且会自动绑定this对象
                console.log(data);
                this.setState({comments: data});
            }//.bind(this);
        })
    }

    submitData(comments){
        var commenets = this.state.comments;
        var newComments = commenets.concat([comments]);
        this.setState({comments: newComments});
        setTimeout(() => {
            //服务器渲染
            $.ajax({
                type: 'post',
                url: this.props.submitUrl,
                dataType: 'json',
                data: comments,
                success: data => {
                    console.log(data);
                },
                error: (xhr, status, err) => {
                    this.setState({comments: commenets});
                }
            })
        },1000);
    }

    /*生命周期*/
    componentDidMount(){
        this.loadData();
    }

    render() {
        return (
            <div className="comment-box">
                <h1>CommentBox</h1>
                <CommentForm onSubmit={comments => {this.submitData(comments)}}/>
                {/*<CommentList comments={comments}/>{/!*属性传递*!/}*/}
                <CommentList comments={this.state.comments}/>{/*状态传递*/}
            </div>
        );
    }
}



var comments2 = [
    {author: 'leon1',content: 'content111118'},
    {author: 'leon2',content: 'content222228'},
    {author: 'leon3',content: 'content333338'},
];

const box = React.render(
    <CommentBox comments={comments2} submitUrl={"submit.js"} url={"comments.json"}/>,
    document.getElementById('content')
);


