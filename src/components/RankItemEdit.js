// rankItem: object
// handleClose: callback
// onSave: callback
// open: bool
export const ProfilePicChooser = (props) => {
    const currentTheme = useTheme();
    const textTheme = getTextTheme(currentTheme);

    const [pictureError, setPictureError] = useState(false);
    const [nameError, setNameError] = useState(false);

    const [picture, setPicture] = useState(props.rankItem.picture);
    const [name, setName] = useState(props.rankItem["item_name"]);
    const [desc, setDesc] = useState(props.rankItem.description);

    return (
        <Dialog onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={props.open}>
            <div class="col" style={{ alignItems: "center", backgroundColor: currentTheme.palette.background.default }}>
                <img
                    style={{ display: "none" }}
                    src={picture}
                    onError={() => setPictureError(true)}
                    onLoad={() => setPictureError(false)}
                />

                {pictureError ? (
                    <h1 style={textTheme}>No Image</h1>
                ) : (
                    <img
                        style={{ borderRadius: "15px", width: "375px", maxWidth: "98%", alignSelf: "center" }}
                        src={picture}
                    />
                )}

                <TextField
                    defaultValue={picture}
                    error={pictureError}
                    helperText={pictureError ? "Image not valid" : ""}
                    style={fieldTheme}
                    id="pic-field"
                    label="Picture"
                    variant="outlined"
                    onChange={(event) => setPicture(event.target.value)}
                />

                <TextField
                    defaultValue={name}
                    error={nameError}
                    helperText={nameError ? "Name cannot be empty" : ""}
                    style={fieldTheme}
                    id="name-field"
                    label="Name"
                    variant="outlined"
                    onChange={(event) => setName(event.target.value)}
                />

                <TextField
                    defaultValue={desc}
                    style={fieldTheme}
                    id="desc-field"
                    label="Desc"
                    variant="outlined"
                    onChange={(event) => setDesc(event.target.value)}
                />

                <ActionButton
                    disabled={error}
                    width="225px"
                    onClick={async () => {
                        console.log("Save");
                    }}
                    label="Save Item"
                />
            </div>
        </Dialog>
    );
};
