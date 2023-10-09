import React from 'react';
import  { useLoaderData } from 'react-router-dom';

function Github() {
    const data = useLoaderData();
    // const [data, setData] = useState([]);
    // useEffect(() => {
    //     fetch('https://api.github.com/users/priyankavaidya-stack')
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data);
    //         setData(data);
    //     })
    // }, []);
  return (
    <div className='text-center m-4 '>
        <h1>
        Github Followers : {data.followers}
        </h1>
        <img src={data.avatar_url} alt="git picture" width={300} />
     <h2>{data.repos_url}</h2>
    </div>
  )
}

export default Github

export const githubInfoLoader = async() => {
    const response = await fetch('https://api.github.com/users/priyankavaidya-stack')
    return response.json();
}
