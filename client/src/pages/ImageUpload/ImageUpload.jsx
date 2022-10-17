export default function ImageUpload () {
    return (
        <form action="/images" enctype="multipart/form-data" method="POST"> 
            <input type="file" name="Image" accept="image/*" />
            <input type="submit" value="Upload Photo"/>
        </form>
    )
}