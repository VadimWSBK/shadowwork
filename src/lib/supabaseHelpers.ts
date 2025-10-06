import { supabase } from './supabaseClient';

export async function upsertProfile(username: string) {
  if (!username) return { error: new Error('Missing username') };
  try {
    const { error } = await supabase
      .from('profiles')
      .upsert({ username }, { onConflict: 'username' });
    return { error };
  } catch (e) {
    return { error: e as Error };
  }
}

export async function persistAnswer(params: {
  username: string;
  dayId: string;
  questionIndex: number;
  answer: string;
}) {
  const { username, dayId, questionIndex, answer } = params;
  if (!username || !dayId) return { error: new Error('Missing identifiers') };
  try {
    const { error } = await supabase
      .from('answers')
      .upsert(
        {
          username,
          day_id: dayId,
          question_index: questionIndex,
          answer_text: answer,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'username,day_id,question_index' }
      );
    return { error };
  } catch (e) {
    return { error: e as Error };
  }
}