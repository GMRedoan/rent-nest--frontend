import Image from 'next/image';

const Logo = () => {
    return (
      <div>
        <Image
          src="/logo.png"
          alt="Logo"
          width={60}
          height={40}
          priority
        />{" "}
      </div>
    );
};

export default Logo;