class AuthController {
    constructor(userModel, jwt, bcrypt) {
        this.userModel = userModel;
        this.jwt = jwt;
        this.bcrypt = bcrypt;
    }

    async register(req, res) {
        const { username, password } = req.body;
        try {
            const hashedPassword = await this.bcrypt.hash(password, 10);
            const newUser = await this.userModel.create({ username, password: hashedPassword });
            res.status(201).json({ message: 'User registered successfully', user: newUser });
        } catch (error) {
            res.status(500).json({ message: 'Error registering user', error });
        }
    }

    async login(req, res) {
        const { username, password } = req.body;
        try {
            const user = await this.userModel.findOne({ username });
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            const isMatch = await this.bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            const token = this.jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            res.status(500).json({ message: 'Error logging in', error });
        }
    }
}

export default AuthController;