import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pwqsuhcfgytuixnhsvdu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3cXN1aGNmZ3l0dWl4bmhzdmR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM4NTM4NDYsImV4cCI6MjAxOTQyOTg0Nn0.zfY63bRn57T2Ax58ixVkbLEp_kkF9eDFe43rzw8po6c';
const supabase = createClient(supabaseUrl, supabaseKey);

export const addUserTag = async (userId, tag) => {
    try {
        const { data, error } = await supabase
            .from('user_tags')
            .insert([{ user_id: userId, tag }])
            .single();
        
        if (error) {
            throw new Error('Error adding user tag');
        }
        
        return data;
    } catch (error) {
        console.error('Error adding user tag:', error);
        throw error;
    }
};

export const getUserTags = async (userId) => {
    try {
        const { data, error } = await supabase
            .from('user_tags')
            .select('tag')
            .eq('user_id', userId);
        
        if (error) {
            throw new Error('Error retrieving user tags');
        }
        
        return data;
    } catch (error) {
        console.error('Error retrieving user tags:', error);
        throw error;
    }
};

export const updateUserSkillXP = async (userId, skillName, xpEarned) => {
    try {
        const { data, error } = await supabase
            .from('user_skills')
            .upsert([{ user_id: userId, skill_name: skillName, xp_earned: xpEarned }]);
        
        if (error) {
            throw new Error('Error updating user skill XP');
        }
        
        return data;
    } catch (error) {
        console.error('Error updating user skill XP:', error);
        throw error;
    }
};

export const getUserSkillLevel = async (userId, skillName) => {
    try {
        const { data, error } = await supabase
            .from('user_skills')
            .select('xp_earned')
            .eq('user_id', userId)
            .eq('skill_name', skillName);
        
        if (error) {
            throw new Error('Error retrieving user skill level');
        }
        
        return data;
    } catch (error) {
        console.error('Error retrieving user skill level:', error);
        throw error;
    }
};
export const fetchMessages = async () => {
    const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching messages:', error);
        return [];
    }
    return data;
};

export const updateMessageReadStatus = async (messageId) => {
    const { data, error } = await supabase
        .from('messages')
        .update({ read: true })
        .match({ id: messageId });

    if (error) {
        console.error('Error updating message read status:', error);
    }
    return data;
};
