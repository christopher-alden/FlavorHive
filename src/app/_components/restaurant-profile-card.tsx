import { Avatar, AvatarFallback, AvatarImage  } from '@components/ui/avatar';
import { Card, CardContent, CardHeader } from '@components/ui/card';
import pb from '@service/pocketbase.service';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Heart } from '@geist-ui/icons'
import { Separator } from '@components/ui/separator';
import { Badge } from '@components/ui/badge';
import { PocketbaseTyped } from 'lib/types/utils.types';
import { round } from '@utils/utils';

interface RestaurantProfileCardInterface{
    restaurant:PocketbaseTyped<RestaurantBase>
}
export default async function RestaurantProfileCard({restaurant}:RestaurantProfileCardInterface) {
    const headerImage = pb.files.getUrl(restaurant, (Array.isArray(restaurant.images) ? restaurant.images[0] as string : "") , {'thumb': '0x300'});
    const coverImage = pb.files.getUrl(restaurant, restaurant.cover as string , {'thumb': '0x300'});
    return (
        <Link className='m-0' href={`/restaurant/${restaurant.id}`}>
            <Card className='w-[250px] h-[350px] lg:w-[350px] lg:h-[500px] overflow-clip bg-white rounded-lg'>
                <CardHeader className='h-[40%] w-full bg-black p-0 relative '>
                    <Image width={1024} height={720} className='w-full h-full object-cover opacity-60 absolute' src={headerImage} alt='headerImage'></Image>
                    <div className='w-full overflow-clip px-2 py-2 z-10  gap-2 flex justify-end'>
                        <Badge className='text-white lg:text-sm px-4 py-2 lg:p-3 h-fit lg:h-full' variant={'dark'}>Liked by 1.2k</Badge>
                        <Badge className='text-white lg:text-sm px-3 py-2 h-fit lg:p-3 lg:h-full' variant={'dark'}><Heart className='w-4 h-4'/></Badge>
                    </div>
                    <Avatar className='lg:w-20 lg:h-20 w-16 h-16 absolute bottom-0 lg:left-8 left-4 translate-y-[50%]' >
                        <AvatarImage className='w-full h-full object-cover' src={coverImage} alt={`@${restaurant.name}`}/>
                        <AvatarFallback>DC</AvatarFallback>
                    </Avatar>
                </CardHeader>
                <CardContent className='lg:p-8 p-4 lg:pt-14 pt-12 flex flex-col gap-2 lg:gap-4 lg:leading-6 h-[60%] justify-between'>
                    <section className='w-full flex flex-col gap-2 lg:gap-4 '>
                        <div className='w-full flex flex-col gap-1 text-base lg:text-lg'>
                            <div className='w-full flex justify-start items-start font-medium leading-5 '>
                                <h1 className='w-[70%] text-wrap line-clamp-2'>{restaurant.name}</h1>
                                <div className='w-[30%] flex gap-1 items-center justify-end'>
                                    <Star color='#6b7280' className="w-4 flex-shrink-0" />
                                    <p>{round(restaurant.cachedRating)}</p>
                                </div>
                            </div>
                            <div className='w-full'>
                                <p className='text-gray-500 text-sm lg:  font-normal line-clamp-1'>{restaurant.location}</p>
                            </div>
                            <Separator className='lg:mt-2 mt-1'/>
                        </div>
                        <div className='w-full'>
                            <p className='text-gray-500  line-clamp-3 text-sm lg: '>{restaurant.description}</p>
                        </div>
                    </section>
                    <section className='hidden  gap-2 lg:flex'>
                        {
                            restaurant.keywords?.tags.map((tag, i)=>{
                                const limit = 2
                                if(i==limit)return(
                                    <Badge key={i} variant={'outline'} className='p-2 px-4 text-xs lg:text-sm'>+{(restaurant.keywords?.tags.length||0) - limit}</Badge>
                                )
                                if(i<limit)return(
                                    <Badge key={i} variant={'secondary'} className='p-2 px-4 text-xs lg:text-sm'>{tag}</Badge>
                                )
                            })
                        }
                    </section>
                </CardContent>
            </Card>
        </Link>
    );
}
