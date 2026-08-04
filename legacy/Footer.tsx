import polywiseLogo from "@/assets/polywise-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground/5 border-t">
      <div className="container-width py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={polywiseLogo} alt="Polywise Logo" className="h-8 w-8" />
            <span className="text-xl font-bold">Polywise</span>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Polywise Tutoring. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Personalized Online Math & Coding Tutoring
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
