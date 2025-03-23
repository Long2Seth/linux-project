export default function AppLogo() {
    return (
        <>
            {/*<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">*/}
            <img src="/images/logo.png" className="h-[50px] w-[50px] object-cover" alt="RUPP Logo" />
            {/*</div>*/}
            <div className="flex flex-col items-start gap-1">
                {/*<h1 className="text-sm font-bold">សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ</h1>*/}
                <h4 className="text-sm ">
                    ROYAL UNIVERSITY <br />
                    OF PHNOM PENH
                </h4>
            </div>
        </>
    );
}
