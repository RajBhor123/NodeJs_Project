const User = require('../models/User');
const { validateUser, validateUpdateUser } = require('../utils/validation');

class UserController {
    
    static async createUser(req, res) {
        try {
            
            const { error, value } = validateUser(req.body);
            if (error) {
                return res.status(400).json({
                    success: false,
                    message: 'Validation error',
                    errors: error.details.map(detail => detail.message)
                });
            }

            
            const existingUser = await User.findByEmail(value.email);
            if (existingUser) {
                return res.status(409).json({
                    success: false,
                    message: 'User with this email already exists'
                });
            }

            
            const newUser = await User.create(value);
            
            res.status(201).json({
                success: true,
                message: 'User created successfully',
                data: newUser
            });
        } catch (error) {
            console.error('Create user error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }

    
    static async getAllUsers(req, res) {
        try {
            const users = await User.findAll();
            
            res.status(200).json({
                success: true,
                message: 'Users retrieved successfully',
                data: users,
                count: users.length
            });
        } catch (error) {
            console.error('Get all users error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }

    
    static async getUserById(req, res) {
        try {
            const { id } = req.params;
            
            
            if (!id || isNaN(parseInt(id))) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid user ID'
                });
            }

            const user = await User.findById(parseInt(id));
            
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            res.status(200).json({
                success: true,
                message: 'User retrieved successfully',
                data: user
            });
        } catch (error) {
            console.error('Get user by ID error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }

    
    static async updateUser(req, res) {
        try {
            const { id } = req.params;
            
            
            if (!id || isNaN(parseInt(id))) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid user ID'
                });
            }

            
            const { error, value } = validateUpdateUser(req.body);
            if (error) {
                return res.status(400).json({
                    success: false,
                    message: 'Validation error',
                    errors: error.details.map(detail => detail.message)
                });
            }

            
            const existingUser = await User.findById(parseInt(id));
            if (!existingUser) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            
            if (value.email && value.email !== existingUser.email) {
                const emailExists = await User.findByEmail(value.email);
                if (emailExists) {
                    return res.status(409).json({
                        success: false,
                        message: 'User with this email already exists'
                    });
                }
            }

            
            const updatedUser = await User.update(parseInt(id), value);
            
            res.status(200).json({
                success: true,
                message: 'User updated successfully',
                data: updatedUser
            });
        } catch (error) {
            console.error('Update user error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }

    
    static async deleteUser(req, res) {
        try {
            const { id } = req.params;
            
            
            if (!id || isNaN(parseInt(id))) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid user ID'
                });
            }

           
            const existingUser = await User.findById(parseInt(id));
            if (!existingUser) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            
            const deletedUser = await User.delete(parseInt(id));
            
            res.status(200).json({
                success: true,
                message: 'User deleted successfully',
                data: deletedUser
            });
        } catch (error) {
            console.error('Delete user error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }
}

module.exports = UserController;