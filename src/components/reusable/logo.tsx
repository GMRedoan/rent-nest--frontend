import Image from 'next/image';

const Logo = () => {
    return (
        <div>
            <Image
                src="https://i.ibb.co.com/1YMhn3yk/favicon-1.png"
                alt="Logo"
                width={60}
                height={20}
                className=""
            />
        </div>
    );
};

export default Logo;