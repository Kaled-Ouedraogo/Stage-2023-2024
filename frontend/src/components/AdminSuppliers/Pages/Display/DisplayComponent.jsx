import DisplayCategories from "./DisplayCategories";
import DisplaySubCategories from "./DisplaySubCategories";
export default function DisplayComponent (props){
    return(
        <div>
            <props.section/>
        </div>
    )
}