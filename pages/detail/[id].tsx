import React, { useRef, useState } from 'react'
import { GoVerified } from 'react-icons/go'
import { MdOutlineCancel } from 'react-icons/md'
import { HiVolumeOff, HiVolumeUp } from 'react-icons/hi';
import { BsFillPlayFill } from 'react-icons/bs';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { Video } from '../../types';

interface IProps {
    postDetails: Video
}

const VideoDetails = ({ postDetails }: IProps) => {
    const [post, setPost] = useState(postDetails);
    const videoRef = useRef(null);


    if (!post) return null;

    return (
        <div className='flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap'>
            <div className='relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black-600'>
                <div className='absolute top-6 left-2 lg:left-6 flex gap-6 z-50'>
                    <p>
                        <MdOutlineCancel className='text-white text-[35px]' />
                    </p>
                </div>
                <div className='relative'>
                    <div className='lg:h-[100vh] h-[60vh]'>
                        <video src={post.video.asset.url} />
                    </div>
                </div>
            </div>
        </div>
    )
}


export const getServerSideProps = async ({
    params: { id },
}: {
    params: { id: string };
}) => {
    const res = await axios.get(`/api/post/${id}`);

    return {
        props: { postDetails: res.data },
    };
};


export default VideoDetails;
