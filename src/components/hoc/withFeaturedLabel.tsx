import type { ProductTypes } from "../../features/shopping/types/shopping.types";

const withFeaturedLabel = <P extends ProductTypes> (WrappedComponent:React.ComponentType<P>) => {
    return (props: P) => {
        return (
            <div className="relative">
                {props.attributes.featured && (
                    <span className="absolute top-0 left-0 bg-black text-white px-2 py-1">
                        Featured
                    </span>
                )}
                <WrappedComponent {...props}/>
            </div>
        )
    }
}

export default withFeaturedLabel;