import axios from 'axios'
import NoResults from '../components/NoResults';
import VideoCard from '../components/VideoCard';
import {Video} from '../types';

interface IProps {
  videos: Video[]
}

const Home = ({videos}: IProps) => {
  return (
   <div className="flex flex-col gap-10 videos h-full">
     {videos.length? (
     videos.map((video: Video)=>(
       <VideoCard post={video} key={video._id} />
     ))
     ) : (
     <NoResults text={'No Videos'}/>
     )}
   </div>
  )
}

export const getServerSideProps = async () =>{
  const {data} = await axios.get('https://tiktok-clone.sid86-dev.repl.co/api/post');
  
  return{
    props:{
      videos:data
    }
  }
}

export default Home
