import {Link} from "react-router-dom";

function NotFoundPage() {
    return (
        <div className="container">
            <header><h1>404 Not Found</h1></header>
            <div className="content">
                <p>The page you're looking for does not exist.</p>
                <br/>
                <Link to="/">Go to Home</Link>
            </div> 
        </div>

    );
}

export default NotFoundPage;