import Image from 'next/image';

const Logo = () => {
    return (
        <div>
            <Image
                src="https://i.ibb.co.com/1YMhn3yk/favicon-1.png"
                alt="Logo"
                width={200}
                height={100}
                className="h-full w-auto object-contain"
            />
        </div>
    );
};

export default Logo;