interface AuthHeaderProps {
  title: string;
  description: string;
  email?: string;
}

const AuthHeader = ({ title, description, email }: AuthHeaderProps) => {
  return (
    <div className='text-center mb-7.5'>
      <h1 className='text-3xl font-black pb-3'>{title}</h1>
      <p>
        {description}
        {""}
        {email && <span className='text-primary'>{email}</span>}
      </p>
    </div>
  );
};

export default AuthHeader;
