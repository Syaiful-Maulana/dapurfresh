const NotFound = ({icon, title, subtitle}) => {
  return ( 
    <div className="flex justify-center items-center text-secondary h-[480px]">
      <div className="text-center">
      `<img src={icon} className="w-16 mx-auto" alt="icon" />
        <h4 className="mt-3 font-semibold">{title}</h4>
        <h4 className="mt-3 text-sm leading-5">{subtitle}</h4>
      </div>
    </div>
   );
}
 
export default NotFound;