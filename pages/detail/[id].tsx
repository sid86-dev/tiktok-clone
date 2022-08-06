import React, { useRef, useState } from 'react'
import { GoVerified } from 'react-icons/go'
import { MdOutlineCancel } from 'react-icons/md'
import { HiVolumeOff, HiVolumeUp } from 'react-icons/hi';
import { BsFillPlayFill } from 'react-icons/bs';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { IUser, Video } from '../../types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import useAuthStore from '../../store/authStore';
import LikeButton from '../../components/LikeButton';

interface IProps {
    postDetails: Video
}

const VideoDetails = ({ postDetails }: IProps) => {
    const [post, setPost] = useState(postDetails);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isVideoMuted, setIsVideoMuted] = useState(false);
    const { userProfile }: any = useAuthStore();

    const router = useRouter()
    const videoRef = useRef<HTMLVideoElement>(null);

    const onVideoClick = () => {
        if (isPlaying) {
            videoRef?.current?.pause();
            setIsPlaying(false)
        }
        else {
            videoRef?.current?.play();
            setIsPlaying(true)
        }
    };

    const handleLike = async (like: boolean) => {
        if (userProfile) {
            const { data } = await axios.put(`/api/like`, {
                userId: userProfile._id,
                postId: post._id,
                like
            })

            setPost({ ...post, likes: data.likes });
        }
    };


    if (!post) return null;

    return (
        <div className='flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap'>
            <div className='relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center'>
                <div className='absolute top-6 left-2 lg:left-6 flex gap-6 z-50'>
                    <p className='cursor-pointer' onClick={() => router.back()}>
                        <MdOutlineCancel className='text-white text-[35px]' />
                    </p>
                </div>
                <div className='relative'>
                    <div className='lg:h-[100vh] h-[60vh]'>
                        <video src={post.video.asset.url} muted={isVideoMuted} className="h-full cursor-pointer" loop ref={videoRef} onClick={onVideoClick} />
                    </div>
                    <div className='absolute top-[45%] left-[40%] cursor-pointer'>
                        {
                            !isPlaying && (
                                <button onClick={onVideoClick}>
                                    <BsFillPlayFill className='text-white text-4xl lg:text-6xl' />
                                </button>
                            )
                        }
                    </div>
                </div>
                <div className='absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer'>
                    {isVideoMuted ?
                        <button onClick={() => setIsVideoMuted(false)}><HiVolumeOff className='text-black text-2xl lg:text-4xl' /></button> :
                        <button onClick={() => setIsVideoMuted(true)}><HiVolumeUp className='text-black text-2xl lg:text-4xl' /></button>
                    }
                </div>
            </div>

            <div className='relative w-[1000px] md:w-[900px] lg:w-[700px]'>
                <div className='mt-10 lg:mt-20'>
                    <div className="flex gap-3 cursor-pointer rounded font-semibold p-2">
                        <div className="md:w-20 md:h-20 w-16 h-16 ml-4">
                            <Link href="/">
                                <>
                                    <Image
                                        width={62}
                                        height={62}
                                        className="rounded-full"
                                        src={post.postedBy.image}
                                        alt="profile photo"
                                        layout="responsive"
                                    />
                                </>
                            </Link>
                        </div>
                        <div>
                            <Link href="/">
                                <div className='flex flex-col mt-3 gap-2'>
                                    <p className='flex gap-2 items-center md:text-md font-bold text-primary'>{post.postedBy.userName} {`
                `}
                                        <GoVerified className='text-blue-400 text-md' />
                                    </p>
                                    <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>{post.postedBy.userName}</p>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <p className='px-10 text-lg text-gray-600'>{post.caption}</p>

                    <div className='mt-10 px-10'>
                        {userProfile && (
                            <LikeButton
                                likes={post.likes}
                                handleLike={() => handleLike(true)}
                                handleDislike={() => handleLike(false)}
                            />
                        )}
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
    const res = await axios.get(`https://tiktok-clone-1ruo4m5fx-sid86-dev.vercel.app/api/post/${id}`);

    return {
        props: { postDetails: res.data },
    };
};


export default VideoDetails;
